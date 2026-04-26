pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Pulled automatically based on the SCM setting in the Jenkins Job, but standard SCM checkout applies here
                checkout scm
            }
        }

        stage('Install Dependencies') {
            environment {
                NODEJS_HOME = tool 'node20'
                PATH = "${NODEJS_HOME}/bin:${env.PATH}"
            }
            steps {
                echo 'Installing Server Dependencies...'
                dir('server') {
                    sh 'npm install'
                }
                echo 'Installing Client Dependencies...'
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            environment {
                NODEJS_HOME = tool 'node20'
                PATH = "${NODEJS_HOME}/bin:${env.PATH}"
            }
            steps {
                echo 'Running Backend Tests...'
                dir('server') {
                    sh 'npm run test'
                }
                echo 'Running Frontend Tests...'
                dir('client') {
                    sh 'npm run test -- --run'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker Images...'
                // Assuming docker is installed on the Jenkins host and the Jenkins user is in the docker group
                sh 'docker compose build'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                echo 'Deploying with Ansible...'
                dir('ansible') {
                    sh 'ansible-playbook playbooks/deploy.yml'
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline run completed."
        }
        success {
            emailext (
                subject: "✅ SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>The Turf Booking CI build was SUCCESSFUL!</p>
                <p>Check the console output here: <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'your-email@example.com' // TODO: Replace with your actual email address
            )
        }
        failure {
            emailext (
                subject: "❌ FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>The Turf Booking CI build FAILED!</p>
                <p>Check the console output here to discover the issue: <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'your-email@example.com' // TODO: Replace with your actual email address
            )
        }
    }
}
