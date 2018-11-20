
const SSO_HOST_HEAD = 'https://cas.';

const SERVER_HOST_HEAD = process.env.SERVER_HOST_HEAD;
const SERVER_HOST_TAIL = process.env.SERVER_HOST_TAIL;

const SSOHost = `${SSO_HOST_HEAD}${SERVER_HOST_TAIL}`;
const backHost = `${SERVER_HOST_HEAD}${SERVER_HOST_TAIL}`;
const backEnd = '/api/login/setSession?back_url=';
export const gotoSSO = () => {
    const feUrl = encodeURIComponent(window.location.href);
    const ServerUrl = `${backHost}${backEnd}${feUrl}`;
    const newUrl = `${SSOHost}/sso/getticket?redirect_url=${encodeURIComponent(ServerUrl)}`;
    window.location.href = newUrl;
};

export default {
    gotoSSO,
};
