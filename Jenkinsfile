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

    stage('Wait for HTML report to finish writing') {
      steps {
        script {
          def reportPath = 'playwright-report\\index.html'
          def retries = 10
          def delay = 1

          for (int i = 0; i < retries; i++) {
            if (fileExists(reportPath)) {
              echo "HTML report is ready at ${reportPath}"
              break
            }
            echo "Waiting for report file... (${i + 1}s)"
            sleep time: delay, unit: 'SECONDS'
          }

          if (!fileExists(reportPath)) {
            error("Playwright report was not found at ${reportPath} after waiting.")
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
