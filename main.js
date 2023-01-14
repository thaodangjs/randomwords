export const getStaticProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const { data } = await response.json();

    const arrayGenres = data.genres.map((genre) => {
        return genre?.name ?? '';
    });
    const arrayStudios = data.studios.map(studio => {
        return studio?.name ?? '';
    });
    const studios = arrayStudios.join(",");
    const genres = arrayGenres.join(",");


    const anime = {
        image: data?.images.jpg.image_url,
        title: data?.title,
        duration: data?.duration,
        score: data?.score,
        rating: data?.rating,
        trailer: data?.trailer.url,
        image_trailer: data?.trailer.images.image_url,
        title_japanese: data?.title_japanese,
        genres: genres,
        studios: studios,
        status: data?.status,
        episodes: data?.episodes,
        source: data?.source,
        synopsis: data?.synopsis
    };

    return {
        props: {
            anime
        },
    }
}
