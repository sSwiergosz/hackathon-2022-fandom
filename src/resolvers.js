export const getUserData = (id) => {
    const db = {
        1: {
            total_pv: 1000,
            days_on_fandom: 45,
            creates: 120,
            contributes: 10,
            posts: 74,
            top_fandoms: [
                {
                    fandom_metadata: {
                        name: 'Star Wars',
                        logo: 'logo url'
                    },
                    top_articles: [
                        {
                            name: 'R2-D2',
                            logo: 'An image of R2-D2 robot',
                        },
                        {
                            name: 'C3-PO',
                            logo: 'An image of C3-PO robot',
                        },
                    ],
                },
            ],
        },
        2: {
            total_pv: 714,
            days_on_fandom: 5,
            creates: 97,
            contributes: 24,
            posts: 4,
            top_fandoms: [
                {
                    fandom_metadata: {
                        name: 'Minecraft',
                        logo: 'logo url'
                    },
                    top_articles: [
                        {
                            name: 'Creeper',
                            logo: 'An image of Creeper',
                        },
                        {
                            name: 'Skeleton',
                            logo: 'An image of Skeleton',
                        },
                    ],
                },
            ],
        }
    };

    return db[id];
};