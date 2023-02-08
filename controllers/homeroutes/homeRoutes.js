const router = require('express').Router();
const { User, Project } = require('../../models');

router.get('/', async (req, res) => {
  const projects = await Project.findAll();
  const projectsData = projects.map(project => {
    return project.get({ plain: true });
  })
  res.render('homepage', { projects: projectsData, logged_in: req.session.logged_in });
});

router.get('/profile', async (req, res) => {
  console.log(req.session);
  if (req.session.logged_in) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      include: [{ model: Project }],
    });
    const userData = user.get({ plain: true });
    res.render('profile', userData);
  } else {
    res.status(500).json({ msg: 'must log in first' });
  }
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      include: [{ model: Project }],
    });
    const userData = user.get({ plain: true });
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

router.get('/project/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    attributes: {
      exclude: ['password'],
    },
    include: [{ model: User }],
  });
  if (!project) {
    res.status(404).json({ msg: 'no such project ID' });
  } else {
    const projectData = project.get({ plain: true });
    res.render('project', projectData);
  }
});

module.exports = router;
