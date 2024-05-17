import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain" // object-contain para manter a proporção da imagem e preencher o espaço
      sizes="100%"
      quality={100} // Qualidade da imagem
      {...props}
    />
  );
};

export default PromoBanner;
