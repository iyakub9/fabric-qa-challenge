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
          bat 'npm ci'
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        script {
          bat 'npx playwright install'
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          bat 'npx playwright test --reporter=html'
        }
      }
    }

    stage('Wait for Report Build') {
      steps {
        script {
          def timeout = 5
          def reportPath = 'playwright-report\\index.html'

          for (int i = 0; i < timeout; i++) {
            if (fileExists(reportPath)) {
              echo "Report is ready: ${reportPath}"
              break
            }
            echo "Waiting for report to be ready... (${i + 1}s)"
            sleep time: 1, unit: 'SECONDS'
          }

          if (!fileExists(reportPath)) {
            error("Playwright HTML report not found after waiting.")
          }
        }
      }
    }

    stage('Publish Playwright Report') {
      steps {
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report'
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
