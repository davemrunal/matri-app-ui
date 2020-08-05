import React, { useState } from 'react';
import './ProfilePhotoUploadPage.css';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awsLibs';
import { useStateWithLabel } from '../libs/stateWithLabel';
import { useAppContext } from '../libs/contextLib';
import Form from 'react-bootstrap/Form';

export default function ProfilePhotoUploadPage() {
    const {emailId} = useAppContext();
    const history = useHistory();
    const [stateFileArray, setStateFileArray] = useStateWithLabel([], 'URI');
    const [stateFileArrayWithoutURI, setStateFileArrayWithoutURI] = useStateWithLabel([], 'withoutURI');
    const [isLoading, setIsLoading] = useState(false);

    function uploadMultipleFiles(e) {
        const fileObj = [];
        const currentArray = [];
        const currentArrayWithoutURI = [];
        fileObj.push(e.target.files);
        const fileList = fileObj[0];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            //console.log('Size of ' + i + ' is ' + file.size);
            if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
                alert(
                    `Please pick a file smaller than ${
                        config.MAX_ATTACHMENT_SIZE / 1000000
                    } MB.`
                );
            } else {
                currentArray.push(URL.createObjectURL(file));
                currentArrayWithoutURI.push(file);
            }
        }
        const tempArray = [...stateFileArray];
        const tempArrayWithoutURI = [...stateFileArrayWithoutURI];
        tempArray.push(...currentArray);
        tempArrayWithoutURI.push(...currentArrayWithoutURI);
        setStateFileArray(tempArray);
        setStateFileArrayWithoutURI(tempArrayWithoutURI);
    }

    async function flipIsPhotoUploadedFlagInDynamoDb() {
        return API.put('profile', `/profile/flipPhotoFlag`, {
            body: {
                emailId: emailId
            }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const promiseArr = stateFileArrayWithoutURI.map(async file => {
                await s3Upload(file);
            });
            await Promise.all(promiseArr);
            await flipIsPhotoUploadedFlagInDynamoDb();
            // console.log('uploading first image now' + stateFileArrayWithoutURI[0]);
            // await s3Upload(stateFileArrayWithoutURI[0]);
            history.push('/');
        } catch (e) {
            setIsLoading(false);
        }
    }

    function validateForm() {
        return stateFileArray && stateFileArray.length > 0 ? true : false;
    }

    function buildImgTag() {
        return (
            <div className="photo-container">
                {stateFileArray && stateFileArray.length > 0 && stateFileArray.map(imageURI =>
                    (<img className="photo-uploaded" key={imageURI} src={imageURI}/>))}
            </div>
        );
    }

    return (
        <div className="ProfilePhoto">
            {buildImgTag()}
            <br/>
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="photo" bsSize="large">
                    <Form.Label>Please upload at least three photos of yourself</Form.Label>
                    <Form.Control
                        type="file"
                        name="photo"
                        onChange={uploadMultipleFiles}
                        multiple
                        accept="image/*"
                        required
                    />
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Upload
                </LoaderButton>
            </form>
        </div>
    );
}
