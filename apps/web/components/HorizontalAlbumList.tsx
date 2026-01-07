import { useRouter } from "next/router";
import ScrollContainer from "react-indiana-drag-scroll";
import { Album } from "@/interfaces/Albumv2";
import HorizontalAlbumCard from "./HorizontalAlbumCard";

function HorizontalAlbumList({ album }: { album: Album[] }) {
  const router = useRouter();
  return (
    <ScrollContainer
      horizontal={true}
      vertical={false}
      className="flex flex-row"
    >
      <div className="mx-4 mobile:mx-2 tablet:mx-3 mini-laptop:mx-2"></div>
      {album.map((album: Album) => {
        const Card = HorizontalAlbumCard as any;
        return (
          <Card
            key={album.idcre.toString()}
            album={album}
            onClick={() => router.push(`/album/${album.idcre}`)}
          />
        );
      })}
    </ScrollContainer>
  );
}

export default HorizontalAlbumList;