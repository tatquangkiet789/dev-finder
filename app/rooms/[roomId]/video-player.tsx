'use client';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@prisma/client';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from './actions';
import { useRouter } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
// const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmRmMGQ1MmQtMmI0Yy00NmJlLWIxZjktZWQzNzJhYjZjNjk3In0.hzQb2GLpIsoQraGddvhM6TCRpEMqb8rd6xvMvgd8QBA';

export function VideoPlayer({ room }: { room: Room }) {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session.data) return;
        if (!room) return;

        const user = {
            id: session.data.user.id,
            name: session.data.user.name!,
            image:
                session.data.user.image! ??
                'https://res.cloudinary.com/dnwauajh9/image/upload/v1703235528/cqk0dmky4xzlhtccuhvt.jpg',
        } satisfies User;

        const client = new StreamVideoClient({
            apiKey,
            user,
            tokenProvider: () => generateTokenAction(session.data.user.id),
        });
        setClient(client);
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call);

        return () => {
            call.leave()
                .then(() => client.disconnectUser())
                .catch((error) => console.error(error));
        };
    }, [room, session.data]);

    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamTheme>
                    <StreamCall call={call}>
                        <CallParticipantsList onClose={() => {}} />
                        <SpeakerLayout />
                        <CallControls onLeave={() => router.replace('/')} />
                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    );
}
