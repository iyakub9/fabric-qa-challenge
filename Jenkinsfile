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
        bat 'npx playwright test --reporter=html'
      }
    }

    stage('Publish Playwright Report') {
      steps {
        sleep time: 2, unit: 'SECONDS'

        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'redirect.html',
          reportName: 'Playwright Report',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: false
        ])
      }
    }

    stage('Add Build Link to Report') {
      steps {
        script {
          currentBuild.description = '<a href="artifact/playwright-report/index.html">📊 View Playwright Report</a>'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**/*.*', allowEmptyArchive: true
    }
  }
}
