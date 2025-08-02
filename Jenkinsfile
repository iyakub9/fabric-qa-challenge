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
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npx playwright test --reporter=html'
      }
    }

    stage('Publish HTML report') {
      steps {
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*.*', fingerprint: true
    }
  }
}
