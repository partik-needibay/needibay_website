import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
  };
  
  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml(
      dirty, 
    )
  });
  
  export const SanitizeHTML = ({ html }) => (
    <div dangerouslySetInnerHTML={sanitize(html, defaultOptions)} />
  );