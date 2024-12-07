pipeline {
    agent any
  
  stages {
      stage('deploy docker images!') {
           when {
              branch "devops"
          }
          steps {
            echo 'building ...'
            sh 'docker build -t frontend .'
         }
      }
  }
      post {
        always {
          echo 'This will always run' 
         
          echo 'Deploying Recylovision...'
          sh 'docker compose --project-name Recylovision up -d'
          echo 'Recylovision Deployed'
        }
    }
}