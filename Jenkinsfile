pipeline {
    agent any

    environment {
        NODEJS_HOME = '/Users/prateek/.nvm/versions/node/v25.4.0'
        PATH = "${NODEJS_HOME}/bin:/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
        BACKEND_IMAGE_NAME = 'prateekkumaryadav/turf-backend'
        FRONTEND_IMAGE_NAME = 'prateekkumaryadav/turf-frontend'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        // Make sure to add credentials 'dockerhub-credentials' with ID and Password in your Jenkins Credentials store
        DOCKER_HUB_CREDS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulled automatically based on the SCM setting in the Jenkins Job, but standard SCM checkout applies here
                checkout scm
            }
        }

        stage('Install Dependencies') {
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

        stage('Build Multi-Arch Docker Images') {
            steps {
                echo 'Building Multi-Arch Docker Images...'
                
                // Create buildx instance if it doesn't exist
                sh "docker buildx create --use --name multiarch_builder || true"
                
                // Build Backend
                dir('server') {
                    sh """
                    docker buildx build \\
                      --platform linux/amd64,linux/arm64 \\
                      -t ${BACKEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \\
                      -t ${BACKEND_IMAGE_NAME}:latest \\
                      .
                    """
                }
                
                // Build Frontend
                dir('client') {
                    sh """
                    docker buildx build \\
                      --platform linux/amd64,linux/arm64 \\
                      -t ${FRONTEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \\
                      -t ${FRONTEND_IMAGE_NAME}:latest \\
                      .
                    """
                }
            }
        }

        stage('Push Multi-Arch Docker Images') {
            steps {
                echo 'Pushing Multi-Arch Docker Images...'
                
                // Login to Docker Hub
                sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin"
                
                // Push Backend
                dir('server') {
                    sh """
                    docker buildx build \\
                      --platform linux/amd64,linux/arm64 \\
                      -t ${BACKEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \\
                      -t ${BACKEND_IMAGE_NAME}:latest \\
                      --push .
                    """
                }
                
                // Push Frontend
                dir('client') {
                    sh """
                    docker buildx build \\
                      --platform linux/amd64,linux/arm64 \\
                      -t ${FRONTEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \\
                      -t ${FRONTEND_IMAGE_NAME}:latest \\
                      --push .
                    """
                }
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
                subject: "BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build was successful!\\nProject: ${env.JOB_NAME}\\nBuild Number: ${env.BUILD_NUMBER}\\nBuild URL: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'prateek.student20@gmail.com', // Updated from reference file
                mimeType: 'text/plain'
            )
        }
        failure {
            emailext (
                subject: "BUILD FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build has failed!\\nProject: ${env.JOB_NAME}\\nBuild Number: ${env.BUILD_NUMBER}\\nBuild URL: ${env.BUILD_URL}\\nCheck the console output",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'prateek.student20@gmail.com', // Updated from reference file
                mimeType: 'text/plain'
            )
        }
    }
}
