document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    // No submit button in the form (both actions are type="button"), but
    // guard against accidental implicit submission (e.g. pressing Enter).
    quoteForm.addEventListener('submit', function (e) { e.preventDefault(); });

    function getQuoteFields() {
      return {
        name: document.getElementById('qName').value.trim(),
        email: document.getElementById('qEmail').value.trim(),
        phone: document.getElementById('qPhone').value.trim(),
        service: document.getElementById('qService').value,
        budget: document.getElementById('qBudget').value,
        details: document.getElementById('qDetails').value.trim()
      };
    }

    var whatsappBtn = document.getElementById('sendWhatsappBtn');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function () {
        if (!quoteForm.reportValidity()) return;
        var f = getQuoteFields();
        var lines = [
          "Hi Site Boss! I'd like a quote.",
          'Name: ' + f.name,
          'Email: ' + f.email,
          'WhatsApp: ' + f.phone,
          'Service: ' + f.service
        ];
        if (f.budget) lines.push('Budget: ' + f.budget);
        lines.push('Details: ' + f.details);

        var message = encodeURIComponent(lines.join('\n'));
        window.open('https://wa.me/27659260367?text=' + message, '_blank');
      });
    }

    var emailBtn = document.getElementById('sendEmailBtn');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        if (!quoteForm.reportValidity()) return;
        var f = getQuoteFields();
        var subject = 'Quote Request from ' + f.name;
        var bodyLines = [
          'Name: ' + f.name,
          'Email: ' + f.email,
          'WhatsApp: ' + f.phone,
          'Service: ' + f.service
        ];
        if (f.budget) bodyLines.push('Budget: ' + f.budget);
        bodyLines.push('');
        bodyLines.push('Project details:');
        bodyLines.push(f.details);

        var mailto = 'mailto:Christel.koeleman2002@gmail.com'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(bodyLines.join('\n'));
        window.location.href = mailto;
      });
    }
  }
});
