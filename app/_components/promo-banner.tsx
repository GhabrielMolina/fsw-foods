import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain" // object-contain para manter a proporção da imagem e preencher o espaço
      sizes="100vw" // Tamanho da imagem em relação à tela quando não há um width definido
      quality={100} // Qualidade da imagem
      {...props}
    />
  );
};

export default PromoBanner;
