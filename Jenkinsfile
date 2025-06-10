pipeline {
    agent any
    environment {
        // SONAR_HOME = tool "Sonar"
        DOCKER_IMAGE = "nayem9b/sheba-backend-jenkins-build"
        DOCKER_TAG = "jenkins-build-${BUILD_NUMBER}"
    }
    stages {
        stage("Clone Code from Github") {
            steps {
                git url: "https://github.com/nayem9b/Sheba.xyz-backend.git", branch: "main"
            }
        }

        // stage("SonarQube Quality Check") {
        //     steps {
        //         withSonarQubeEnv("Sonar") {
        //             sh """
        //                 ${SONAR_HOME}/bin/sonar-scanner \
        //                 -Dsonar.projectName=wanderlust \
        //                 -Dsonar.projectKey=wanderlust
        //             """
        //         }
        //     }
        // }

        // stage("OWASP Dependency Check") {
        //     steps {
        //         dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'dc'
        //         dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        //     }
        // }

        // stage("Sonar Quality Gate Scan") {
        //     steps {
        //         timeout(time: 2, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: false
        //         }
        //     }
        // }

        // stage("Trivy File System Scan") {
        //     steps {
        //         sh "trivy fs --format table -o trivy-fs-report.html ."
        //     }
        // }

        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        // stage("Deploy using Docker Compose") {
        //     steps {
        //         sh "docker-compose up -d"
        //     }
        // }
    }
    post {
        always {
            sh "docker logout"
            cleanWs()
        }
    }
}
