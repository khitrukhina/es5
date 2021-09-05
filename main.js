class View {
  constructor(params) {}
  setTitle(title) {
    document.title = title;
  }

  getHtml() {
    return '';
  }
}

class Departments extends View {
  constructor(params) {
    super(params);
    this.setTitle('Departments');
  }
  getHtml() {
    return $("<a data-link href='#/department'>Department</a>");
  }
}

class Department extends View {
  constructor(params) {
    super(params);
    this.setTitle('Department');
  }
  getHtml() {
    return $('<h1>Department</h1>');
  }
}

function pathToRegex(path) {
  return new RegExp(
    '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
  );
}

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

function router() {
  const routes = [
    { path: '/', view: Departments },
    { path: '/department', view: Department },
    { path: '/departments/:id', view: Department },
  ];
  //test route for match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.hash.slice(1).match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find((potentialMatch) => {
    return potentialMatch.result !== null;
  });

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  const view = new match.route.view(getParams(match));
  $('#root').html(view.getHtml());
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
