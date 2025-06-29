import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import mime from 'mime-types';
import Stream from 'stream';
import { O2AUTH, CREDENTIAL_DRIVE } from '../config/config';

export async function authorize() {
	const { client_secret, client_id, redirect_uris } = O2AUTH;

	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
	oAuth2Client.setCredentials(CREDENTIAL_DRIVE);
	return oAuth2Client
}

// export async function authorize() {
// 	const CREDENTIALS_PATH = path.join(__dirname, '../credentials.json');
// 	const TOKEN_PATH = path.join(__dirname, '../token.json');
// 	console.log(CREDENTIALS_PATH)
// 	const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
// 	const { client_secret, client_id, redirect_uris } = credentials.web;

// 	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// 	// Check token
// 	if (fs.existsSync(TOKEN_PATH)) {
// 		const token = fs.readFileSync(TOKEN_PATH, 'utf8');
// 		oAuth2Client.setCredentials(JSON.parse(token));
// 		return oAuth2Client;
// 	}

// 	// Nếu chưa có token, tạo link và in ra để người dùng xác thực
// 	const authUrl = oAuth2Client.generateAuthUrl({
// 		access_type: 'offline',
// 		scope: ['https://www.googleapis.com/auth/drive.file'],
// 	});
// 	console.log('Authorize this app by visiting this URL:', authUrl);

// 	const readline = require('readline');
// 	const rl = readline.createInterface({
// 		input: process.stdin,
// 		output: process.stdout,
// 	});

// 	const code: string = await new Promise(resolve => {
// 		rl.question('Enter the code from that page here: ', resolve);
// 	});

// 	rl.close();

// 	const tokenResponse = await oAuth2Client.getToken(code);
// 	oAuth2Client.setCredentials(tokenResponse.tokens);

// 	fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
// 	return oAuth2Client;
// }


export async function uploadFile(buffer: Buffer, auth: any, fileName: string, mimeType: string) {
	const drive = google.drive({ version: 'v3', auth });

	const bufferStream = new Stream.PassThrough()
	bufferStream.end(buffer)

	const res = await drive.files.create({
		requestBody: {
			name: fileName,
			mimeType: mimeType,
			parents: ['1mx-SxlgXJBph5SaCNHUqzI28P_i5jgd7']
		},
		media: {
			mimeType,
			body: bufferStream,
		},
		fields: 'id, name, parents, webViewLink, webContentLink'
	});

	console.log('File uploaded:', res.data);
	return res.data
}

authorize()