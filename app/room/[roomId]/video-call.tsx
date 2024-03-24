'use client';

import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const apiKey = 'mmhfdzb5evj2'; // the API key can be found in the "Credentials" section
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSmVyZWMiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0plcmVjIiwiaWF0IjoxNzEwOTI0NzM3LCJleHAiOjE3MTE1Mjk1NDJ9.VabH0zg0dk_ZwDoESiOQOsTSa3eBAPSeF8d91zLeYwY'; // the token can be found in the "Credentials" section// the user id can be found in the "Credentials" section
const callId = 'dVmnwXDh3zmC'; // the call id can be found in the "Credentials" section

export function DevFinderVideo() {
    const session = useSession();

    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        if (!session.data) return;

        const { user: sessionUser } = session.data;
        const user = {
            id: sessionUser.id,
            name: sessionUser.name!,
            image: sessionUser.image!,
        } satisfies User;

        const client = new StreamVideoClient({ apiKey, user, token });
        const call = client.call('default', callId);
        call.join({ create: true });
        setClient(client);
        setCall(call);

        return () => {
            call.leave();
            client.disconnectUser();
        };
    }, [session.data]);

    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <MyUILayout />
                </StreamCall>
            </StreamVideo>
        )
    );
}

export const MyUILayout = () => {
    const call = useCall();

    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();

    if (callingState !== CallingState.JOINED) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Call {call?.id} has {participantCount} participants
        </div>
    );
};
