'use strict';

import { Platform, NativeModules } from 'react-native';

import MediaStream from './MediaStream';
import MediaStreamError from './MediaStreamError';
import MediaStreamTrack from './MediaStreamTrack';

const { WebRTCModule } = NativeModules;


export default function getDisplayMedia(constraints) {
    if (Platform.OS !== 'android') {
        return Promise.reject(new TypeError());
    }

    if (!constraints || !constraints.video) {
        return Promise.reject(new TypeError());
    }

    return new Promise((resolve, reject) => {
        WebRTCModule.getDisplayMedia()
            .then(data => {
                const { streamId, track } = data;
                const stream = new MediaStream(streamId);

                stream.addTrack(new MediaStreamTrack(track));

                resolve(stream);
            }, error => {
                reject(new MediaStreamError(error));
            });
    });
}
