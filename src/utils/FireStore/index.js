import firebase from '../../component/Firebase';

class FireStore {
    static db = firebase.firestore();

    /**
     * 
     * @param {number} limit 
     * @param {Date} startAfter 
     * @param {string} sort 
     */
    static async getArticles(limit = null, startAfter = null, sort = 'desc') {
        let startAfterDoc, querySnapshot, articles = [];
        let query = FireStore.db.collection("articles").orderBy('date', sort);

        if (startAfter) {
            startAfterDoc = await FireStore.db.collection("articles").doc(startAfter).get();
            if (!startAfterDoc.exists) {
                return new Promise((resolve, reject) => {
                    reject({
                        error: "DOCUMENT_MISSED",
                        description: "There is not specified document in storage. Check the query parameters."
                    });
                });
            }
        }

        if (startAfter && startAfterDoc) query = query.startAfter(startAfterDoc);
        if (limit) query = query.limit(limit);

        querySnapshot = await query.get();
        querySnapshot.forEach(doc => {
            articles.push({
                ...doc.data(),
                id: doc.id
            })
        })

        return new Promise((resolve, reject) => {
            resolve(articles)
        });
    }

    static async getArticleByID(id) {
        let query = FireStore.db.collection("articles").doc(id);

        const articleDoc = await query.get();
        if (!articleDoc.exists) {
            return new Promise((resolve, reject) => {
                reject({
                    error: "DOCUMENT_MISSED",
                    description: "There is not specified document in storage. Check the document ID."
                });
            });
        }

        return new Promise((resolve, reject) => {
            resolve({
                id: articleDoc.id,
                ...articleDoc.data()
            })
        });
    }

    static async addArticle(title, categories, content) {
      const document = await FireStore.db.collection("articles").add({
        title: title,
        categories: categories,
        content: content,
        autorh: 'Valerii Boiko',
        date: new Date(),
      })

      return document;
    }
}

export default FireStore;