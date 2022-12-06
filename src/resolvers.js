export const getUserData = (id) => {
    const db = [{
        user_id: 1,
        stats: {
            "total_pv":145643,
            "days_on_fandom":35,
            "creates":9,
            "contributes":36,
            "posts":5,
            "top_fandoms":[
                {
                    "fandom_metadata":{
                        "name":"Star Wars",
                        "logo":"https://logo_starwars"
                    },
                    "top_articles":[
                        {
                            "article_name":"Luke Skywalker",
                            "article_logo":"https://other_starwars_logo"
                        },
                        {
                            "article_name":"Han Solo",
                            "article_logo":"https://another_starwars_logo"
                        }
                    ]
                },
                {
                    "fandom_metadata":{
                        "name":"Marvel",
                        "logo":"https://logo_marvel"
                    },
                    "top_articles":[
                        {
                            "article_name":"Hulk",
                            "article_logo":"https://hulk_logo"
                        }
                    ]
                }
            ]
        }
    }];

    return db.find((el) => Number(el.user_id) === Number(id));
};