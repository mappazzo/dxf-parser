
import * as helpers from '../ParseHelpers'
import attribHandler from './attrib.js'

export default function EntityParser() {}

EntityParser.ForEntityName = 'INSERT';

EntityParser.prototype.parseEntity = function(scanner, curr) {
    var entity;
    entity = { type: curr.value };
    curr = scanner.next();
    while(curr !== 'EOF') {
        if(curr.code === 0) break;

        switch(curr.code) {
            case 2:
                entity.name = curr.value;
                break;
            case 41:
                entity.xScale = curr.value;
                break;
            case 42:
                entity.yScale = curr.value;
                break;
            case 43:
                entity.zScale = curr.value;
                break;
            case 10:
                entity.position = helpers.parsePoint(scanner);
                break;
            case 50:
                entity.rotation = curr.value;
                break;
            case 70:
                entity.columnCount = curr.value;
                break;
            case 71:
                entity.rowCount = curr.value;
                break;
            case 44:
                entity.columnSpacing = curr.value;
                break;
            case 45:
                entity.rowSpacing = curr.value;
                break;
            case 210:
                entity.extrusionDirection = helpers.parsePoint(scanner);
                break;
            case 0:
              if (curr.value == 'ENDSEQ')
                break;
              block.entities = parseEntities(true);
              break;
            default: // check common entity attributes
                helpers.checkCommonEntityProperties(entity, curr);
                break;
        }
        curr = scanner.next();
    }

    return entity;
};

var parseAttribs = function () {
    var attribs = [];

    var endingOnValue = 'SEQEND';

    while (true) {

      if (curr.code === 0) {
        if (curr.value === endingOnValue) {
          break;
        }
        var attrib;
        log.debug(curr.value + ' {');
        attrib = attribHandler.parseEntity(scanner, curr);
        curr = scanner.lastReadGroup;
        log.debug('}');
        ensureHandle(attrib);
        attribs.push(attrib);
      } else {
        // ignored lines from unsupported entity
        curr = scanner.next();
      }
    }
    curr = scanner.next(); // swallow up SEQEND
    return attribs;
  };
