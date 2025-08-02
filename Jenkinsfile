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
        bat 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npx playwright test'
      }
    }

    stage('Archive Playwright HTML Report') {
      steps {
        sleep time: 2, unit: 'SECONDS'

        publishHTML([
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
