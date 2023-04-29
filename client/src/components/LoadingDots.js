import styles from './loadingdots.css';

const LoadingDots = ({
    color = '#000',
    style = 'small',
}) => {
    return (
      <span className={style == 'small' ? styles.loading2 : styles.loading}>
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
      </span>
    );
  };
  
export default LoadingDots;
  
LoadingDots.defaultProps = {
    style: 'small',
};
