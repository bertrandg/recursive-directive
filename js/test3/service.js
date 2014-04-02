
app.factory('SegmentBuilder', function() {
    
    var datapointInfo = {
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
    }

    var new_element = {
        datapoint: {
            level: -1,
            position: -1,
            type: 'datapoint',
            id: '-1',
            datapoint: {id: '987864', name: 'Resolution', code: 'a.g.r', price: 650000},
            operator: 'ends_with',
            value: '',
            mode: 'at_least_one',
            thresholdValue: 0,
            thresholdUnit: 'percent',
            recency: 0
        },
        segment: {
            level: -1,
            position: -1,
            type: 'segment',
            id: '-1',
            segment: {id: '648648', name: 'segment bien bien bien', price: 544000}
        },
        group: {
            level: -1,
            position: -1,
            type: 'group',
            id: '-1',
            relation: 'and',
            elements: []
        }
    };
    
    var currentSegmentDetail = {
        level: 0,
        position: 1,
        type: 'group',
        id: 'group35848',
        relation: 'and',
        elements: [
            {
                level: 1,
                position: 1,
                type: 'datapoint',
                id: 'datapoint65848',
                datapoint: {id: '754564', name: 'Gender', code: 'v.f.g', price: 60000},
                operator: 'contains',
                value: 'homme',
                mode: 'equals',
                thresholdValue: 12,
                thresholdUnit: 'unit',
                recency: 12
            },
            {
                level: 1,
                position: 4,
                type: 'group',
                id: 'group8979',
                relation: 'or',
                elements: [
                    {
                        level: 2,
                        position: 6,
                        type: 'group',
                        id: 'group2316',
                        relation: 'and',
                        elements: []
                    },
                    {
                        level: 2,
                        position: 4,
                        type: 'segment',
                        id: 'segment871528',
                        segment: {id: '847616', name: 'segment de la muerte', price: 84000}
                    },
                    {
                        level: 2,
                        position: 1,
                        type: 'group',
                        id: 'group21384',
                        relation: 'or',
                        elements: [
                            {
                                level: 3,
                                position: 1,
                                type: 'segment',
                                id: 'segment819954',
                                segment: {id: '51655', name: 'the segment xyz', price: 9100}
                            },
                            {
                                level: 3,
                                position: 3,
                                type: 'datapoint',
                                id: 'datapoint87195',
                                datapoint: {id: '54159', name: 'Keyword', code: 's.w.w', price: 156000},
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
                level: 1,
                position: 2,
                type: 'segment',
                id: 'segment8944',
                segment: {id: '7568468', name: 'mon segment toto', price: 42000}
            },
            {
                level: 1,
                position: 3,
                type: 'group',
                id: 'group54614',
                relation: 'and',
                elements: []
            },
            {
                level: 1,
                position: 12,
                type: 'datapoint',
                id: 'datapoint68789',
                datapoint: {id: '7413235', name: 'Browser', code: 's.w.b', price: 10000},
                operator: 'ends_with',
                value: 'opera',
                mode: 'atLeastOnce',
                thresholdValue: 0,
                thresholdUnit: 'time',
                recency: 100
            },
        ]
    };
    
    
    
    
    
    var getNewDatapoint = function(level, position) {
        var datapoint = angular.copy(new_element.datapoint);
        datapoint.id = 'datapoint' + Math.floor((Math.random()*100000)+1);
        datapoint.level = level;
        datapoint.position = position;
        return datapoint;
    };
    
    var getNewSegment = function (level, position) {
        var segment = angular.copy(new_element.segment);
        segment.id = 'segment' + Math.floor((Math.random()*100000)+1);
        segment.level = level;
        segment.position = position;
        return segment;
    };
    
    var getNewGroup = function (level, position) {
        var group = angular.copy(new_element.group);
        group.id = 'group' + Math.floor((Math.random()*100000)+1);
        group.level = level;
        group.position = position;
        return group;
    };

    return {
        getNewDatapoint: getNewDatapoint,
        getNewSegment: getNewSegment,
        getNewGroup: getNewGroup,
        datapointInfo: datapointInfo,
        currentSegment: currentSegmentDetail
    };
});