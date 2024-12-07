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
         
          echo 'Deploying H2R...'
          sh 'docker compose --project-name H2R up -d'
          echo 'H2R Deployed'
        }
    }
}