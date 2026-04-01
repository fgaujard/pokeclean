const ImageFromApi: React.FC<{
  url: string;
  alt: string;
  className?: string;
}> = ({ url, alt, className }) => {
  return (
    <img
      src={`${import.meta.env.VITE_API_BASE_URL}storage/${url}`}
      alt={alt}
      className={className}
    />
  );
};

export default ImageFromApi;
