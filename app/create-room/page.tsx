import { CreateRoomForm } from './create-room-form';

export default function CreateRoomPage() {
    return (
        <div className='mx-auto container flex flex-col gap-8 pt-12 pb-24'>
            <h1 className='text-4xl font-bold'>Create Room</h1>
            <CreateRoomForm />
        </div>
    );
}
