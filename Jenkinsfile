pipeline {
  agent any

  tools {
    nodejs 'Node 20'
  }

  environment {
    CI = 'true'
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

    stage('Install Playwright browsers') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright install --with-deps'
          } else {
            bat 'npx playwright install'
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
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report',
          alwaysLinkToLastBuild: true,
          keepAll: true,
          allowMissing: false
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '**/test-results/**/*.*', allowEmptyArchive: true
    }
  }
}
