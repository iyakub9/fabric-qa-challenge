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

    stage('Build Playwright Report') {
      steps {
        script {
          bat 'npx playwright show-report --no-open'
          def reportPath = 'playwright-report\\index.html'
          if (!fileExists(reportPath)) {
            error("Playwright HTML report was not generated.")
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
