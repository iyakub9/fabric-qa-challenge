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

    stage('Build HTML report') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright show-report --no-open'
          } else {
            bat 'npx playwright show-report --no-open'
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
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: false
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
