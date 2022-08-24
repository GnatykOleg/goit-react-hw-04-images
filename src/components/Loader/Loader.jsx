import { InfinitySpin } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.spinner}>
      <InfinitySpin width="200" color="black" />
      <p>Loading.....</p>
    </div>
  );
}
