module.exports = {
    apps: [
      {
        name: 'recent_ucb_front',
        script: './pages/index.tsx',
        // args: 'start',
        // cwd: '.next',
        instances: '1',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        // 개발환경 설정
        env: {
          NODE_ENV: "development",
          PORT: "8089",
        },
        // 운영환경 설정 실행시 --env production 옵션으로 지정할 수 있다.
        env_production: {
          NODE_ENV: "production",
          PORT: "8080",
        },
      },
    ],
  };