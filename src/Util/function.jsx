import queryString from "query-string";
import TEXT_DEFINE from "../Constant/textDefine";
import { get } from "lodash";
import INFO_DEFINE from "../Constant/infoDefine";

export const generateDataToTree = (data, isRoot) => {
  const newTree = data.map((item) => {
    return {
      key: item.key || 0,
      title: item.title || "",
      childNode: (item.select && item.select.length > 0 && generateDataToTree(item.select, false)) || []
    };
  });
  return newTree;
};

export const getNodePath = async (keys) => {
  let path = "";
  if (keys) {
    keys.map((i, k) => {
      if (i.title) {
        if (k < keys.length - 1) {
          path += `${i.title} -> `;
        } else {
          path += i.title;
        }
      }
    });
  }
  return path;
};

export function hasPath(root, selectNode, arr, founded = false) {
  if (!root) {
    return false;
  } else {
    if (root) {
      if (root.key !== 0) {
        arr.push({
          key: root.key,
          title: root.title,
        });
      }
      if (selectNode.key === root.key) {
        founded = true;
        return true;
      }
      if (root.children.length > 0 && !founded) {
        root.children.forEach((node) => {
          hasPath(node, selectNode, arr, founded);
        });
      } else if (!founded) {
        arr.pop();
      }
      // console.log(founded,root.key,founded && getNodePath(arr))
      return founded && getNodePath(arr);
    }
  }
}

export function* generateChildrenNodes(node, r) {
  if (node) {
    if (node.children.length === 0) {
      r.push({
        key: node.key || 0, title: node.title || ""
      })
      yield r;
    }
    else {
      for (const q of node.children) {
        yield* generateChildrenNodes(q, [...r, { key: node.key || 0, title: node.title || "" }]);
      }
    }
  }
}

export function* endingAt(t, loc) {
  let r
  for (r of generateChildrenNodes(t, [])) {
    if (r[r.length - 1].key === loc) {
      yield getNodePath(r);
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const getPathWithParams = (path = '', params = {}) => {
  if (params) {
    Object.keys(params).forEach(p => {
      const searchStrParam = `\/:${p}`;
      if (searchStrParam.length > 2) {
        path = path.replace(searchStrParam, `\/${(params)[p]}`);
      } else {
        path = `${path}${queryString.stringify(params).length > 0 ? "/" + queryString.stringify(params) : ""}`
      }
    });
  }
  return path;
};


export function withPayloadType(t) {
  return ({ payload: t })
}


export const checkUndefined = (val) => {
  if (Array.isArray(val)) {
    return val.length > 0 ? val : []
  } else {
    return val || val !== undefined || val !== "" || val !== null ? val : "";
  }
};

export const checkSpecialCharacter = (value) => value.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);

export const formatInt = (numberParams, defaultNum = 0) => {
  return isNaN(numberParams) ? defaultNum : numberParams;
}

export const getTitleTable = (model, arrayTitle, arrayItemRemove = []) => {
  let newArrayTitle = model.concat(arrayTitle);
  if (arrayItemRemove.length > 0) {
    let titleTable = newArrayTitle;
    arrayItemRemove.map(i => {
      titleTable = titleTable.filter((ele) => ele !== i);
    });
    return titleTable;
  } else {
    return newArrayTitle;
  }
};

export const generateColumnTable = (params) => {
  if (params.columnLabel && params.columnLabel.length > 0) {
    const getLabels = params.columnLabel.map(key => {
      const label = params.pageTag && get(TEXT_DEFINE.PAGE[params.pageTag.toUpperCase()], key);
      return { key, label };
    });
    const tablelObject = getLabels.map(item => {
      const customField = params.customComponents?.map(item => item.field);
      if (customField?.includes(item.key)) {
        return {
          field: item.key,
          headerName: item.label,
          ...((params.customComponents).find(column => column.field === item.key))
        }
      }
      else {
        return {
          field: item.key,
          headerName: item.label
        }
      }
    });
    return tablelObject;
  }
}

export function removeObjectEmptyValue(obj) {
  return obj && Object.entries(obj)
    .filter(([_, v]) => !!v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export const customOptionSelect = (data, params) => {
  let newData = [];
  if (data && data.length > 0 && params) {
    data.map((i, k) => {
      let object = {};
      params.map((i2, k) => {
        if (k === 0) {
          object = { label: i[i2] }
        } else if (k === 1) {
          object = { ...object, value: i[i2] }
        } else {
          object = { ...object, [i2]: i[i2] };
        }
      });
      if (Object.keys(object).length > 0) {
        newData.push(object)
      }
    })
  }
  return newData;
};

export const formatMoney = (val) => {
  let num = 0;
  let oldVal = val ? val.toString() : "";
  if (oldVal === "" || oldVal === 0) {
    num = 0;
  } else {
    num = isNaN(parseInt(oldVal.replace(/,/g, '')).toString()) ? 0 : parseInt(oldVal.replace(/,/g, ''));
    // num = parseInt(oldVal.replace(/,/g, ''));
    num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // let newVal = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num;
};

export const formatNumber = (val) => {
  let num = 0;
  let oldVal = val ? val.toString() : "";
  if (oldVal === "" || oldVal === 0) {
    num = 0;
  } else {
    num = isNaN(parseInt(oldVal.replace(/,/g, '')).toString()) ? 0 : parseInt(oldVal.replace(/,/g, ''));
    // num = parseInt(oldVal.replace(/,/g, ''));
    num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
  }
  // let newVal = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
  return num;
};

export function getThumbsUrl(thumb = {}) {
  return (Object.keys(thumb)).length > 0 && [
    {
      ...thumb,
      url: thumb?.url || ""
    }
  ] || [];
}

export const checkLoadedImage = (url) => {
  let imageCheck = new Image();
  imageCheck.src = url + "!";
  imageCheck.onerror = event => {
    event.target.src = INFO_DEFINE.DEFAULT_THUMB.preview;
    return event.target.src
  }
  // console.log(imageCheck.src, imageCheck.complete)
  // if(!imageCheck.complete) {
  //   imageCheck.src = INFO_DEFINE.DEFAULT_THUMB.preview;
  // }
  return imageCheck;
}

export const onLoadErrorImage = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = INFO_DEFINE.DEFAULT_THUMB.preview;
  // event.currentTarget.className = className;
}

export function getSlug(slug) {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}
