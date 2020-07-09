import firebase from '../../component/Firebase';

class FireStore {
  static db = firebase.firestore();

  /**
   * 
   * @param {number} limit 
   * @param {string} startAfter 
   * @param {string} sort 
   */
  static async getArticles(config) {
    const options = {
      limit: config.limit || 1,
      startAfter: config.startAfter || null,
      sort: config.sort || 'desc',
      categories: config.categories || [],
    };

    let startAfterDoc, querySnapshot, articles = [];
    let query = FireStore.db.collection("articles").orderBy('date', options.sort);

    if (options.startAfter) {
      startAfterDoc = await FireStore.db.collection("articles").doc(options.startAfter).get();
      if (!startAfterDoc.exists) {
        return new Promise((resolve, reject) => {
          reject({
            error: "DOCUMENT_MISSED",
            description: "There is not specified document in storage. Check the query parameters."
          });
        });
      }

      query = query.startAfter(startAfterDoc);
    }

    query = FireStore._categoriesToQuery(query, options.categories);

    querySnapshot = await query.limit(options.limit).get();
    querySnapshot.forEach(doc => {
      articles.push({
        ...doc.data(),
        id: doc.id
      })
    })

    return Promise.resolve(articles);
  }


  static async getArticleByID(id) {
    let query = FireStore.db.collection("articles").doc(id);
    const articleDoc = await query.get();

    return new Promise((resolve, reject) => {
      if (articleDoc.exists) {
        resolve({
          id: articleDoc.id,
          ...articleDoc.data()
        })
      } else {
        reject({
          error: 'DOCUMENT_MISSED'
        });
      }
    });
  }

  static addArticle(article) {
    if (!article.title || !article.content) {
      Promise.reject("INVALID_ARTICLE");
    }

    return FireStore.db.collection("articles").add({
      title: article.title,
      categories: article.categories,
      content: article.content,
      author: article.author,
      date: new Date(),
    })
  }

  static getCategories = () => {
    const categories = [];

    return new Promise((resolve, reject) => {
      FireStore.db.collection('categories').get()
        .then(querySnapshot => {
          querySnapshot.forEach(cat => {
            categories.push(cat.data().name);
          })

          resolve(categories);
        })
        .catch((error) => {
          reject()
        });
    });
  }

  static _categoriesToQuery = (query, categories) => {
    let queryWithCats = query;

    categories.forEach((cat) => {
      queryWithCats = queryWithCats.where('categories.' + cat, '==', true);
    });

    return queryWithCats;
  }

  static getAdminEmails() {
    return new Promise((resolve, reject) => {
      FireStore.db.collection('admins').get()
        .then(querySnapshot => {
          const emails = [];
          querySnapshot.forEach(email => {
            emails.push(email.data().email);
          })

          resolve(emails);
        })
        .catch(error => {
          reject("")
        })
    })
  }
}

export default FireStore;