import { useEffect } from 'react';

const useAuth = () => {
    // Define initSendOTP function in the outer scope
    function initSendOTP(config) {
        const script = document.createElement('script');
        script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
        script.onload = () => {
            window.initSendOTP(config);
        };
        document.body.appendChild(script);
    }

    // useEffect(() => {
    //     const configuration = {
    //         widgetId: "34656f736145383531343338",
    //         tokenAuth: "422133Toct6mnINmUY664507f5P1",
    //         identifier: "",
    //         exposeMethods: "false",
    //         success: (data) => {
    //             console.log('success response', data);
    //         },
    //         failure: (error) => {
    //             console.log('failure reason', error);
    //         },
    //         "VAR1": "<VAR1>"
    //     };
        
        // Call the initSendOTP function
        initSendOTP(configuration);

        return () => {
            const script = document.querySelector('script[src*="otp-provider.js"]');
            if (script) {
                script.remove();
            }
        

    // Return the initSendOTP function
    return { initSendOTP };
};

export default useAuth;
