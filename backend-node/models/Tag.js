const BaseModel = require('../models/BaseModel');

class Tag extends BaseModel {

  static get table() {
    return 'TAGS';
  }

  constructor() {
    super();
    this.name = "";
  }

  static fromDB(row) {
    const tag = new Tag(); 
    Object.assign(tag, {
      name: row.name
    });
    return tag;
  }

  static checkIfAdd(tags) {
    const tagsSeparated = tags.split(' ');
    const findByPromises = tagsSeparated.map(currentValue => 
      this.findByNoException('name', currentValue)
    );

    return Promise.all(findByPromises)
      .then(values => {
        console.debug("resultOfFindByTags:", values);
        return values.reduce((accumulator, currentValue, index) => {
          if (currentValue === null) {
            accumulator.push(tagsSeparated[index]);
          }
          return accumulator;
        }, []);
      }).then(tagsToBeAdded =>  {
        console.debug("tagsToBeAdded:", tagsToBeAdded);
        const promisesTagsToBeAdded = tagsToBeAdded.map(currentValue => {
          const tag = new Tag();
          Object.assign(tag, { name: currentValue });
          this.createWithId(tag)
        });
        return Promise.all(promisesTagsToBeAdded);
      }).then(values => {
        return values;
      });
  }
}

module.exports = Tag;
