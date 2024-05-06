const { spawn } = require('child_process');

const execute = () => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['src/model/main.py']);
        let stdoutData = '';
        let stderrData = '';

        // Capture stdout
        pythonProcess.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        // Capture stderr
        pythonProcess.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        // Handle script exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log(stdoutData);
                resolve(stdoutData);
            } else {
                reject(stderrData || `Python script exited with code ${code}`);
            }
        });

        // Handle errors
        pythonProcess.on('error', (error) => {
            reject(error.message);
        });
    });
};

module.exports = { execute };