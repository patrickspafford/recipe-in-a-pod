import colors from '../../utils/colors'

interface IPhotoFrame {
    imageTarget: any
    height: number
}

const PhotoFrame = ({ imageTarget, height }: IPhotoFrame) => (
  imageTarget
    ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '4rem',
          width: '100%',
        }}
      >
        <img
          alt="Recipe"
          height={height}
          width="100%"
          src={imageTarget}
          style={{ objectFit: 'cover', borderRadius: '2rem' }}
        />
      </div>
    )
    : (
      <div
        style={{
          height,
          margin: 'auto',
          backgroundColor: `${colors.primary}`,
          opacity: 0.2,
          width: '100%',
          borderRadius: '2rem',
        }}
      />

    )
)

export default PhotoFrame
