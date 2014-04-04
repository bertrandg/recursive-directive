
app.factory('SegmentBuilder', function() {
    
    var criterionInfo = {
        operator: [
            {value:'contains',      name:'contains'},
            {value:'equals',        name:'equals (case insensitive)'},
            {value:'regexp',        name:'regular expression'},
            {value:'starts_with',   name:'starts with'},
            {value:'ends_with',     name:'ends with'},
            {value:'upper_than',    name:'upper than'},
            {value:'lesser_than',   name:'lesser than'}
        ],
        mode: [
            {value:'at_least_one',                      name:'at least once'},
            {value:'none',                              name:'none'},
            {value:'all',                               name:'all'},
            {value:'equals',                            name:'='},
            {value:'upper_than_n_percent',              name:'>'},
            {value:'lesser_than_n_percent',             name:'<'},
            {value:'upper_than_n_percent_or_equal',     name:'>='},
            {value:'lesser_than_n_percent_or_equal',    name:'<='}
        ],
        thresholdUnit: [
           {value:'percent',    name:'%'},
           {value:'unit',       name:'times'}
        ]
    };
    
    var groupInfo = {
      relation: [
          {value:'and',    name:'And'},
          {value:'or',     name:'Or'},
          {value:'none',   name:'None'}
      ]
    };
    
    var events = {
        name: 'segmentBuilderEvent',
        type: {
            UPDATE_PRICE: 'UPDATE_PRICE',
            OPEN_SEGMENT_SELECTOR: 'OPEN_SEGMENT_SELECTOR',
            OPEN_DATAPOINT_SELECTOR: 'OPEN_DATAPOINT_SELECTOR'
        }
    };

    var new_element = {
        criterion: {
            position: -1,
            type: 'criterion',
            id: '-1',
            criterion: {id: '987864', name: 'Resolution', code: 'a.g.r', price: 650000},
            operator: 'ends_with',
            value: '',
            mode: 'at_least_one',
            thresholdValue: 0,
            thresholdUnit: 'percent',
            recency: 0
        },
        segment: {
            position: -1,
            type: 'segment',
            id: '-1',
            segment: {id: '648648', name: 'segment bien bien bien', price: 544000}
        },
        group: {
            position: -1,
            type: 'group',
            id: '-1',
            relation: 'and',
            elements: []
        }
    };
    
    var currentSegmentDetail = {
        position: 1,
        type: 'group',
        id: 'group35848',
        relation: 'and',
        elements: [
            {
                position: 1,
                type: 'criterion',
                id: 'criterion65848',
                criterion: {id: '754564', name: 'Gender', code: 'v.f.g', price: 60000},
                operator: 'contains',
                value: 'homme',
                mode: 'equals',
                thresholdValue: 12,
                thresholdUnit: 'unit',
                recency: 12
            },
            {
                position: 4,
                type: 'group',
                id: 'group8979',
                relation: 'or',
                elements: [
                    {
                        position: 6,
                        type: 'group',
                        id: 'group2316',
                        relation: 'and',
                        elements: []
                    },
                    {
                        position: 4,
                        type: 'segment',
                        id: 'segment871528',
                        segment: {id: '847616', name: 'segment de la muerte', price: 84000}
                    },
                    {
                        position: 1,
                        type: 'group',
                        id: 'group21384',
                        relation: 'or',
                        elements: [
                            {
                                position: 1,
                                type: 'segment',
                                id: 'segment819954',
                                segment: {id: '51655', name: 'the segment xyz', price: 9100}
                            },
                            {
                                position: 3,
                                type: 'criterion',
                                id: 'criterion87195',
                                criterion: {id: '54159', name: 'Keyword', code: 's.w.w', price: 156000},
                                operator: 'equals',
                                value: 'toto',
                                mode: 'upper_than_n_percent_or_equal',
                                thresholdValue: 51,
                                thresholdUnit: 'unit',
                                recency: 51
                            }
                        ]
                    }
                ]
            },
            {
                position: 2,
                type: 'segment',
                id: 'segment8944',
                segment: {id: '7568468', name: 'mon segment toto', price: 42000}
            },
            {
                position: 3,
                type: 'group',
                id: 'group54614',
                relation: 'and',
                elements: []
            },
            {
                position: 12,
                type: 'criterion',
                id: 'criterion68789',
                criterion: {id: '7413235', name: 'Browser', code: 's.w.b', price: 10000},
                operator: 'ends_with',
                value: 'opera',
                mode: 'atLeastOnce',
                thresholdValue: 0,
                thresholdUnit: 'time',
                recency: 100
            },
        ]
    };
    
    
    
    var getNewCriterion = function(position) {
        var criterion = angular.copy(new_element.criterion);
        criterion.id = 'criterion' + Math.floor((Math.random()*100000)+1);
        criterion.position = position;
        return criterion;
    };
    
    var getNewSegment = function(position) {
        var segment = angular.copy(new_element.segment);
        segment.id = 'segment' + Math.floor((Math.random()*100000)+1);
        segment.position = position;
        return segment;
    };
    
    var getNewGroup = function(position) {
        var group = angular.copy(new_element.group);
        group.id = 'group' + Math.floor((Math.random()*100000)+1);
        group.position = position;
        return group;
    };
    
    
    
    var resetAllIdInThisGroup = function(elements) {
        angular.forEach(elements, function(element, key){
            element.id = element.type + Math.floor((Math.random()*100000)+1);
            
            if(element.type == 'group') {
                resetAllIdInThisGroup(element.elements);
            }
        });
    };
    
    
    
    var duplicateElement = function(element, position) {
        var duplicate_element = angular.copy(element);
        duplicate_element.id = duplicate_element.type + Math.floor((Math.random()*100000)+1);
        duplicate_element.position = position;
        
        if(duplicate_element.type == 'group') {
            resetAllIdInThisGroup(duplicate_element.elements);
        }
        
        return duplicate_element;
    };
    
    
    
    var getGroupPrice = function(group) {
        var price = 0;
        
        angular.forEach(group.elements, function(element, key) {
            switch(element.type) {
                case 'criterion':
                    price += element.criterion.price;
                    break;
                case 'segment':
                    price += element.segment.price;
                    break;
                case 'group':
                    price += getGroupPrice(element);
                    break;
            }
        });
        return price;
    };
    
    var getCurrentSegmentPrice = function() {
        return getGroupPrice(currentSegmentDetail);
    };

    return {
        getNewCriterion: getNewCriterion,
        getNewSegment: getNewSegment,
        getNewGroup: getNewGroup,
        duplicateElement: duplicateElement,
        criterionInfo: criterionInfo,
        groupInfo: groupInfo,
        currentSegment: currentSegmentDetail,
        getCurrentSegmentPrice: getCurrentSegmentPrice,
        events: events
    };
});