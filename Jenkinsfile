pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImageTag = sh(returnStdout: true, script: 'date +%s').trim()
                    sh "docker build . --file Dockerfile --tag my-image-name:${dockerImageTag}"
                }
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                }
            }
        }
        
        stage('Build and Push Image') {
            steps {
                script {
                    def dockerImageTag = sh(returnStdout: true, script: 'date +%s').trim()
                    sh "docker build . --file Dockerfile --tag my-image-name:${dockerImageTag}"
                    sh "docker tag my-image-name:${dockerImageTag} nayem9b/sheba:latest"
                    sh "docker push nayem9b/sheba:latest"
                }
            }
        }
    }
}
