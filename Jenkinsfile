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

    stage('Run Playwright Tests') {
      steps {
        bat 'npx playwright test --reporter=html,junit'
      }
    }

    stage('Wait for Report Build') {
      steps {
        script {
          echo 'Waiting for Playwright report to finish writing...'
          sleep time: 2, unit: 'SECONDS'
          if (!fileExists('playwright-report/index.html')) {
            error('❌ Playwright report not found after waiting.')
          }
        }
      }
    }

    stage('Publish Playwright Report') {
      steps {
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: false
        ])
        script {
          echo "🔗 View report directly: ${env.BUILD_URL}artifact/playwright-report/index.html"
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**/*.*', allowEmptyArchive: true
      archiveArtifacts artifacts: 'playwright-report/**/*.*', allowEmptyArchive: true
      junit 'test-results/**/*.xml'
    }
  }
}
