import setAttributes from '../utils/setAttributes';
import normalizeColor from '../utils/normalizeColor';
import {createRect} from "./renderRect";

/**
 * Create SVGTextElement from an annotation definition.
 * This is used for anntations of type `textbox`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGTextElement} A text to be rendered
 */
export default function renderText(a) {

  var viewer = document.querySelector("#viewer");
  var ruler = document.querySelector("#ruler");
  if (!ruler) {
    ruler = document.createElement('span');
    ruler.setAttribute("id", "ruler");
    ruler.setAttribute('style',
      'visibility: hidden;' +
      'white-space: nowrap;' +
      'position: absolute; top: 0px; left: 0px;');
    viewer.appendChild(ruler);
  }
  ruler.setAttribute('style',
    'visibility: hidden;' +
    'white-space: nowrap;' +
    'position: absolute; top: 0px; left: 0px;' +
    'font-size: ' + parseInt(a.size, 10) + 'px;');
  ruler.innerHTML = a.content;
  var textWidth = ruler.clientWidth;
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  var rect = createRect({
    x: a.x - 2,
    y: a.y + parseInt(a.size, 10) / 10,
    width: textWidth + 4,
    height: parseInt(a.size + 2, 12)
  });

  setAttributes(text, {
    x: a.x,
    y: a.y + parseInt(a.size, 10),
    fill: normalizeColor(a.color || '#000'),
    fontSize: a.size
  });
  text.innerHTML = a.content;

  let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  setAttributes(group, {
    fill: normalizeColor("#0088ff"),
    fillOpacity: .5,
    x: a.x,
    y: a.y + parseInt(a.size, 10),
  });


  group.appendChild(rect);
  group.appendChild(text);

  return group;
}
