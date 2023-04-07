import { google } from 'googleapis'
import fs from 'fs'

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
    refresh_token: process.env.DRIVE_REFRESH_TOKEN
})

export const uploadGoogleDrive = async (file) => {
    try {
        const drive = google.drive({
            version: "v3",
            auth: oAuth2Client
        })

        const response = await drive.files.create({
            requestBody: {
                name: file.filename,
                mimeType: file.mimeType,
                parents: ['1QO-waprZAe4SODG5OlANNzhwCy9vIxtb']
            },
            media: {
                mimeType: file.mimeType,
                body: fs.createReadStream(file.path)
            }
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: response.data.id,
            fields: 'webViewLink, webContentLink'
        })

        return {
            id: response.data.id,
            gdLink: result.data.webViewLink
        }

    } catch (error) {
        console.log(error)
    }
};

export const uploadGoogleDriveProduct = async (file) => {
    try {
        const drive = google.drive({
            version: "v3",
            auth: oAuth2Client
        })

        const response = await drive.files.create({
            requestBody: {
                name: file.filename,
                mimeType: file.mimeType,
                parents: ['1QO-waprZAe4SODG5OlANNzhwCy9vIxtb']
                // parents: ['1o-FdBmJ30UZ-apwoutsGR4_gW1FIGPBU']
            },
            media: {
                mimeType: file.mimeType,
                body: fs.createReadStream(file.path)
            }
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: response.data.id,
            fields: 'webViewLink, webContentLink'
        })

        return {
            id: response.data.id,
            gdLink: result.data.webViewLink
        }

    } catch (error) {
        console.log(error)
    }
}
