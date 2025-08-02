pipeline {
  agent any

  tools {
    nodejs 'Node 20'
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Run tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright test --reporter=html'
          } else {
            bat 'npx playwright test --reporter=html'
          }
        }
      }
    }

    stage('Publish HTML report') {
      steps {
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report',
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**/*.*', allowEmptyArchive: true
    }
  }
}
