pipeline {
    agent any

    stages {
        
        stage('Clean Workspace') {
            steps {
                deleteDir() 
            }
        }
        
        stage('gitCheckout') {
            steps {
               script {
                    if (fileExists('.git')) {
                        sh 'git reset --hard'
                        sh 'git clean -fd'
                        sh 'git pull origin main'
                    } else {
                        git branch: 'main', url: 'https://github.com/andoniainalahatra/Elecdis_CSMS_OCPP_1_6-FrontEnd.git', credentialsId: 'github-credentials-id'
                    }
                }
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Cleanup Docker') {
            steps {
                sh '''
                docker stop my-nginx-app || true
                docker rm -f my-nginx-app || true
                docker rmi -f my-nginx-app || true
                '''
            }
        }
        
        stage('Run Docker') {
            steps {
                sh 'docker build -t my-app .' 
                sh 'docker run -d -p 80:80 --name my-nginx-app my-app'
            }
        }
        
    }

    post {
        success {
            emailext (
                body: 'Build completed successfully.',
                subject: 'Build Success Notification',
                to: 'kevinrakoto77@gmail.com',
                attachLog: true
            )
        }
        failure {
            emailext (
                body: 'The build has failed.',
                subject: 'Build Failure Notification',
                to: 'kevinrakoto77@gmail.com',
                attachLog: true
            )
        }
    }
}
