export const typeDefs = `#graphql
    type Metadata {
        name: String
        logo: String
    }
    
    type TopFandom {
        fandom_metadata: Metadata
        top_articles: [Metadata]
    }
    
    type Stats {
        total_pv: Int
        days_on_fandom: Int
        creates: Int
        contributes: Int
        posts: Int
        top_fandoms: [TopFandom]
    }

#    type UserData {
#        user_id: ID
#        stats: Stats
#    }
    
    type Query {
        userData(id: ID!): Stats
    }
`;