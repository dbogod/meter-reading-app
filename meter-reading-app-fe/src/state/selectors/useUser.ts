import { useAppSelector } from '../hooks';

const useUser = () => useAppSelector(state => state.user.user);

export default useUser;