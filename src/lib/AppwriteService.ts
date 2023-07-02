import { Account, Avatars, Client } from 'appwrite';

export const SsrHostname: string = 'bash.lv';
export const AppwriteHostname: string = 'bash.lv';

export const AppwriteEndpoint = 'https://b.bash.lv/v1';
export const AppwriteProject = 'SSR';

const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

const account = new Account(client);
const avatars = new Avatars(client);

export const AppwriteService = {
	signOut: async () => {
		await account.deleteSession('current');
	},
	getAccount: async () => {
		return await account.get<any>();
	},
	getAccountPicture: (name: string) => {
		return avatars.getInitials(name.split("").reverse().join(""), 256, 256).toString();
	},
	setSession: (hash: string) => {
		const authCookies: any = {};
		authCookies['a_session_' + AppwriteProject] = hash;
		client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);
	}
};
